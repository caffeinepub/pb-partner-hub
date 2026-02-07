import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    metaApiConfig : ?{
      accessToken : Text;
      whatsappBusinessAccountId : Text;
      phoneNumberId : Text;
    };
  };

  type RecipientRecord = {
    phoneNumber : Text;
    partnerId : Text;
    sourceSystem : Text;
    recipientType : {
      #individual;
      #corporateClient;
      #teamMember;
      #representative;
      #automatedSystem;
    };
    description : Text;
  };

  type NewActor = {
    metaApiConfig : ?{
      accessToken : Text;
      whatsappBusinessAccountId : Text;
      phoneNumberId : Text;
    };
    approvedRecipients : Map.Map<Text, RecipientRecord>;
  };

  public func run(old : OldActor) : NewActor {
    let approvedRecipients = Map.empty<Text, RecipientRecord>();
    approvedRecipients.add("9168761915", {
      phoneNumber = "9168761915";
      partnerId = "admin";
      sourceSystem = "PB Partners";
      recipientType = #individual;
      description = "Admin's WhatsApp number";
    });

    {
      old with
      approvedRecipients;
    };
  };
};
