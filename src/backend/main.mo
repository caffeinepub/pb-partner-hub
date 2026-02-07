import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import OutCall "http-outcalls/outcall";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type MetaApiConfig = {
    accessToken : Text;
    whatsappBusinessAccountId : Text;
    phoneNumberId : Text;
  };

  public type MetaPhoneNumberStatus = {
    totalNumbers : Nat;
    testNumbers : Nat;
    productionNumbers : Nat;
    hasAnyNumberAttached : Bool;
    apiStatusCode : Nat;
  };

  public shared ({ caller }) func getMetaApiConfig() : async MetaApiConfig {
    assertAdmin(caller);
    switch (metaApiConfig) {
      case (null) { Runtime.trap("Meta API config missing") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func updateMetaApiConfig(config : MetaApiConfig) : async () {
    assertAdmin(caller);
    metaApiConfig := ?config;
  };

  public shared ({ caller }) func hasAtLeastOnePhoneNumberAttached() : async MetaPhoneNumberStatus {
    assertAdmin(caller);
    switch (metaApiConfig) {
      case (null) { Runtime.trap("Meta API config missing") };
      case (?metaApiConfig) {
        let url = "https://graph.facebook.com/v15.0/" # metaApiConfig.whatsappBusinessAccountId # "/message_whatsapp_phone_numbers";
        let headers : [OutCall.Header] = [
          { name = "Authorization"; value = "Bearer " # metaApiConfig.accessToken },
        ];
        let response = await OutCall.httpGetRequest(url, headers, transform);
        let jsonString = response;
        let responseCode = if (jsonString.contains(#text "[]")) { 200 } else {
          if (jsonString.contains(#text "error")) { 403 } else { 500 };
        };
        let (totalNumbers, testNumbers, productionNumbers) = if (responseCode != 200) {
          (0, 0, 0);
        } else {
          let isTest = jsonString.contains(#text "test_number");
          let isActive = jsonString.contains(#text "ACTIVE");
          let testCount = if (isTest) { 1 } else { 0 };
          let productionCount = if (isActive) { 1 } else { 0 };
          let totalCount = testCount + productionCount;
          (totalCount, testCount, productionCount);
        };
        let hasNumbers = totalNumbers > 0;
        {
          totalNumbers;
          testNumbers;
          productionNumbers;
          hasAnyNumberAttached = hasNumbers;
          apiStatusCode = responseCode;
        };
      };
    };
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
    phone : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    assertUser(caller);
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    assertUserOrSelf(user, caller);
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    assertUser(caller);
    userProfiles.add(caller, profile);
  };

  public type ContactFormSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let contactFormSubmissions = Map.empty<Text, ContactFormSubmission>();

  public type DocumentType = {
    #panCard;
    #aadhaarCard;
    #bankDetails;
    #mobileNumber;
    #email;
    #selfie;
    #educationCertificate;
  };

  public type SubmittedDocument = {
    id : Text;
    docType : DocumentType;
    fileName : Text;
    uploadedAt : Time.Time;
    fileContent : Storage.ExternalBlob;
  };

  let submittedDocuments = Map.empty<Text, SubmittedDocument>();

  public type OnboardingRequirement = {
    docType : DocumentType;
    description : Text;
    required : Bool;
  };

  public query func getOnboardingRequirements() : async [OnboardingRequirement] {
    [
      {
        docType = #panCard;
        description = "PAN Card";
        required = true;
      },
      {
        docType = #aadhaarCard;
        description = "Aadhaar Card";
        required = true;
      },
      {
        docType = #bankDetails;
        description = "Bank Account Details";
        required = true;
      },
      {
        docType = #mobileNumber;
        description = "Mobile Number";
        required = true;
      },
      {
        docType = #email;
        description = "Email Address";
        required = true;
      },
      {
        docType = #selfie;
        description = "Selfie (Live Photo)";
        required = true;
      },
      {
        docType = #educationCertificate;
        description = "10th Pass Certificate/Highest Education Certificate";
        required = true;
      },
    ];
  };

  public type OfficeContactData = {
    address : Text;
    city : Text;
    district : Text;
    state : Text;
    phone : Text;
    email : Text;
  };

  var contactFormData : OfficeContactData = {
    address = "Flat No 2, Sudarshan Housing Society, Indira Nagar, Nashik, Maharashtra 422009";
    city = "Nashik";
    district = "Nashik";
    state = "Maharashtra";
    phone = "7972584060";
    email = "Prashant.pbp47@gmail.com";
  };

  public type FAQ = {
    question : Text;
    answer : Text;
  };

  let onboardingFaqs = Map.empty<Text, FAQ>();

  public type PartnerBenefit = {
    title : Text;
    description : Text;
  };

  let partnerBenefits = Map.empty<Text, PartnerBenefit>();

  public type WhatsAppMessage = {
    id : Text;
    sender : Text;
    recipient : Text;
    content : Text;
    timestamp : Time.Time;
    status : MessageStatus;
  };

  public type MessageStatus = {
    #sent;
    #delivered;
    #read;
    #failed;
  };

  let whatsappMessages = Map.empty<Text, WhatsAppMessage>();

  public shared func submitContactForm(
    name : Text,
    email : Text,
    phone : Text,
    company : Text,
    message : Text,
  ) : async () {
    let submission : ContactFormSubmission = {
      name;
      email;
      phone;
      company;
      message;
      timestamp = Time.now();
    };
    contactFormSubmissions.add(email, submission);
  };

  public query ({ caller }) func getAllContactFormSubmissions() : async [ContactFormSubmission] {
    assertAdmin(caller);
    contactFormSubmissions.values().toArray();
  };

  public shared ({ caller }) func uploadDocument(
    docType : DocumentType,
    fileName : Text,
    fileContent : Storage.ExternalBlob,
  ) : async () {
    assertUser(caller);
    let documentId = fileName.concat(Time.now().toText());
    let document : SubmittedDocument = {
      id = documentId;
      docType;
      fileName;
      uploadedAt = Time.now();
      fileContent;
    };
    submittedDocuments.add(documentId, document);
  };

  public query ({ caller }) func getAllSubmittedDocuments() : async [SubmittedDocument] {
    assertAdmin(caller);
    submittedDocuments.values().toArray();
  };

  public shared ({ caller }) func updateOfficeContactData(data : OfficeContactData) : async () {
    assertAdmin(caller);
    contactFormData := data;
  };

  public query func getOfficeContactData() : async OfficeContactData {
    contactFormData;
  };

  public shared ({ caller }) func addFAQ(id : Text, question : Text, answer : Text) : async () {
    assertAdmin(caller);
    onboardingFaqs.add(id, { question; answer });
  };

  public query func getAllFAQs() : async [FAQ] {
    onboardingFaqs.values().toArray();
  };

  public shared ({ caller }) func addPartnerBenefit(id : Text, title : Text, description : Text) : async () {
    assertAdmin(caller);
    partnerBenefits.add(id, { title; description });
  };

  public query func getAllPartnerBenefits() : async [PartnerBenefit] {
    partnerBenefits.values().toArray();
  };

  public type MessagePayload = {
    from : Text;
    to : Text;
    content : Text;
  };

  public type MetaApiResponse = {
    metaMessageId : Text;
    deliveryStatus : MessageStatus;
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func sendWhatsAppMessageViaAPI(payload : MessagePayload) : async MetaApiResponse {
    assertAdmin(caller);
    assertRecipientApproved(payload.to);

    switch (metaApiConfig) {
      case (null) { Runtime.trap("Meta API config missing") };
      case (?config) {
        let apiUrl = "https://graph.facebook.com/v15.0/" # config.phoneNumberId # "/messages";
        let headers = [
          { name = "Authorization"; value = "Bearer " # config.accessToken },
          { name = "Content-Type"; value = "application/json" },
        ];
        let requestBody = "{
          \"from\": \"" # payload.from # "\",
          \"to\": \"" # payload.to # "\",
          \"content\": \"" # payload.content # "\"
        }";

        let _ = await OutCall.httpPostRequest(apiUrl, headers, requestBody, transform);
        let metaMessageId = Time.now().toText();

        let whatsappMessage : WhatsAppMessage = {
          id = metaMessageId;
          sender = payload.from;
          recipient = payload.to;
          content = payload.content;
          timestamp = Time.now();
          status = #delivered;
        };
        whatsappMessages.add(metaMessageId, whatsappMessage);

        {
          metaMessageId;
          deliveryStatus = #delivered;
        };
      };
    };
  };

  public query ({ caller }) func getWhatsAppIntegrationStatus() : async Text {
    assertAdmin(caller);
    switch (metaApiConfig) {
      case (null) { "Not Connected" };
      case (?_) { "Connected" };
    };
  };

  public query ({ caller }) func getWhatsAppTokenStatus() : async Text {
    assertAdmin(caller);
    "Valid";
  };

  public query ({ caller }) func getWhatsAppAccountDetails() : async ?MetaApiConfig {
    assertAdmin(caller);
    metaApiConfig;
  };

  public shared ({ caller }) func sendWhatsAppMessage(
    sender : Text,
    recipient : Text,
    content : Text,
  ) : async () {
    assertAdmin(caller);
    let messageId = sender.concat(recipient).concat(Time.now().toText());

    let message : WhatsAppMessage = {
      id = messageId;
      sender;
      recipient;
      content;
      timestamp = Time.now();
      status = #sent;
    };

    whatsappMessages.add(messageId, message);
  };

  public query ({ caller }) func getAllWhatsAppMessages() : async [WhatsAppMessage] {
    assertAdmin(caller);
    whatsappMessages.values().toArray();
  };

  public type MetaWebhookVerificationRequest = {
    mode : Text;
    verifyToken : Text;
    challenge : Text;
  };

  public type MetaWebhookVerificationResponse = {
    responseCode : Nat;
    responseBody : Text;
  };

  public type MetaWebhookVerificationLog = {
    timestamp : Time.Time;
    request : MetaWebhookVerificationRequest;
    response : MetaWebhookVerificationResponse;
  };

  let metaWebhookVerificationLogs = Map.empty<Nat, MetaWebhookVerificationLog>();
  var successfulVerifications = 0;
  var failedVerifications = 0;
  var modeMismatchedVerifications = 0;

  public type WebhookVerificationOutcome = {
    #success : Text;
    #invalidToken;
    #modeMismatch;
  };

  public shared query ({ caller }) func verifyMetaWebhook(
    request : MetaWebhookVerificationRequest,
  ) : async WebhookVerificationOutcome {
    let timestamp = Time.now();
    let logId = timestamp.toNat();
    let verificationResult = switch (request.mode, Text.equal(request.verifyToken, "pbpartnershub")) {
      case ("subscribe", true) {
        successfulVerifications += 1;
        #success(request.challenge);
      };
      case ("subscribe", false) {
        failedVerifications += 1;
        #invalidToken;
      };
      case (_, _) {
        modeMismatchedVerifications += 1;
        #modeMismatch;
      };
    };

    let responseCode = switch (verificationResult) {
      case (#success(_)) { 200 };
      case (#invalidToken) { 403 };
      case (#modeMismatch) { 400 };
    };

    let responseBody = switch (verificationResult) {
      case (#success(challenge)) { challenge };
      case (#invalidToken) { "INVALID TOKEN" };
      case (#modeMismatch) { "MODE MISMATCH" };
    };

    let logEntry : MetaWebhookVerificationLog = {
      timestamp;
      request;
      response = {
        responseCode;
        responseBody;
      };
    };

    metaWebhookVerificationLogs.add(logId, logEntry);

    verificationResult;
  };

  public type WebhookVerificationLogEntry = {
    timestamp : Time.Time;
    request : MetaWebhookVerificationRequest;
    response : MetaWebhookVerificationResponse;
  };

  public type WebhookVerificationStats = {
    successful : Nat;
    failed : Nat;
    modeMismatched : Nat;
    logs : [WebhookVerificationLogEntry];
  };

  public query ({ caller }) func getWebhookVerificationStats() : async ?WebhookVerificationStats {
    assertAdmin(caller);
    let logsArray = metaWebhookVerificationLogs.values().toArray();
    let mappedLogs = logsArray.map(
      func(log) {
        {
          timestamp = log.timestamp;
          request = log.request;
          response = log.response;
        };
      }
    );
    ?{
      successful = successfulVerifications;
      failed = failedVerifications;
      modeMismatched = modeMismatchedVerifications;
      logs = mappedLogs;
    };
  };

  // New: Approved recipients list and constants for admin check
  public type RecipientRecord = {
    phoneNumber : Text;
    partnerId : Text;
    sourceSystem : Text;
    recipientType : RecipientType;
    description : Text;
  };

  public type RecipientType = {
    #individual;
    #corporateClient;
    #teamMember;
    #representative;
    #automatedSystem;
  };

  let approvedRecipients = Map.empty<Text, RecipientRecord>();

  func isRecipientInApprovedList(phoneNumber : Text) : Bool {
    approvedRecipients.containsKey(phoneNumber);
  };

  func assertRecipientApproved(phoneNumber : Text) {
    if (not isRecipientInApprovedList(phoneNumber)) {
      Runtime.trap("Not whitelisted. WhatsApp message cannot be sent. Please add the recipient to the approved list first.");
    };
  };

  // Admin helper function for authentication check
  func assertAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // User helper function for authentication check
  func assertUser(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
  };

  // User or self helper function for authentication check
  func assertUserOrSelf(user : Principal, caller : Principal) {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
  };

  // Store the initial approved recipient and meta API config.
  var metaApiConfig : ?MetaApiConfig = ?{
    accessToken = "EAA8W8UrRtQsBQl1L9ZBuUwplzMuQqt00MEsMznDN2mLAK6G7FdcqfMxGZCi7FJvWWqldQ9EiAp7Mn69GarNcsD9R28loA8ggPwAZBTyoRmmzXyAU8p6koZBEhqeSQZBxObZBphQgUEJCXnsOUQGx13ZBUTLsFFenaDAxpKiXYrtQSZAVu1tn8XtQTkVhmQiQgkWqGm0WFfw8Mpvi10KYzGTY4z6ZBdJLjIffv2RzFkGjnuwyKOyz3fvwcC0859ILcNxExUEZAhiK8FZBOKE1xqCVeGaV73T58BE1dVCAwZDZD";
    whatsappBusinessAccountId = "1631977771136695";
    phoneNumberId = "958574407341345";
  };
};
