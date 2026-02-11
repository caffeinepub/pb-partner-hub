import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface SubmittedDocument {
    id: string;
    fileName: string;
    fileContent: ExternalBlob;
    docType: DocumentType;
    uploadedAt: Time;
}
export interface MetaApiResponse {
    deliveryStatus: MessageStatus;
    metaMessageId: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface WhatsAppTemplate {
    id: string;
    content: string;
    name: string;
    createdAt: Time;
    updatedAt?: Time;
}
export type Time = bigint;
export interface FAQ {
    question: string;
    answer: string;
}
export interface Language {
    code: string;
    policy: string;
}
export interface ContactFormSubmission {
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Example {
    body_text: Array<string>;
}
export interface PartnerBenefit {
    title: string;
    description: string;
}
export interface ExternalWhatsAppTemplate {
    id: string;
    status: string;
    name: string;
    components: Array<TemplateComponent>;
    language: Language;
    category: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface WebhookVerificationLogEntry {
    request: MetaWebhookVerificationRequest;
    response: MetaWebhookVerificationResponse;
    timestamp: Time;
}
export interface TemplateInput {
    content: string;
    name: string;
}
export interface MetaApiConfig {
    whatsappBusinessAccountId: string;
    accessToken: string;
    phoneNumberId: string;
}
export interface TemplateComponent {
    example?: Example;
    format?: string;
}
export interface OfficeContactData {
    city: string;
    email: string;
    district: string;
    state: string;
    address: string;
    phone: string;
}
export interface MetaWebhookVerificationResponse {
    responseBody: string;
    responseCode: bigint;
}
export interface Schedule {
    id: string;
    messageContent: string;
    templateId: string;
    runCount: bigint;
    lastRunTimestamp?: Time;
    templateName: string;
    recipients: Array<RecipientRecord>;
    scheduleType: ScheduleType;
    runAtTimestamp?: Time;
}
export interface WebhookVerificationStats {
    modeMismatched: bigint;
    logs: Array<WebhookVerificationLogEntry>;
    successful: bigint;
    failed: bigint;
}
export interface WhatsAppMessage {
    id: string;
    status: MessageStatus;
    content: string;
    recipient: string;
    sender: string;
    timestamp: Time;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface RecipientRecord {
    description: string;
    partnerId: string;
    phoneNumber: string;
    recipientType: RecipientType;
    sourceSystem: string;
}
export interface OnboardingRequirement {
    description: string;
    required: boolean;
    docType: DocumentType;
}
export interface MetaPhoneNumberStatus {
    hasAnyNumberAttached: boolean;
    totalNumbers: bigint;
    testNumbers: bigint;
    apiStatusCode: bigint;
    productionNumbers: bigint;
}
export interface MessagePayload {
    to: string;
    content: string;
    from: string;
}
export type WebhookVerificationOutcome = {
    __kind__: "modeMismatch";
    modeMismatch: null;
} | {
    __kind__: "success";
    success: string;
} | {
    __kind__: "invalidToken";
    invalidToken: null;
};
export interface MetaWebhookVerificationRequest {
    challenge: string;
    verifyToken: string;
    mode: string;
}
export interface TemplateUpdateInput {
    id: string;
    content: string;
    name: string;
}
export interface UserProfile {
    name: string;
    email?: string;
    phone?: string;
}
export enum DocumentType {
    bankDetails = "bankDetails",
    mobileNumber = "mobileNumber",
    selfie = "selfie",
    email = "email",
    panCard = "panCard",
    aadhaarCard = "aadhaarCard",
    educationCertificate = "educationCertificate"
}
export enum MessageStatus {
    read = "read",
    sent = "sent",
    delivered = "delivered",
    failed = "failed"
}
export enum RecipientType {
    individual = "individual",
    automatedSystem = "automatedSystem",
    corporateClient = "corporateClient",
    representative = "representative",
    teamMember = "teamMember"
}
export enum ScheduleType {
    immediate = "immediate",
    daily = "daily"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFAQ(id: string, question: string, answer: string): Promise<void>;
    addPartnerBenefit(id: string, title: string, description: string): Promise<void>;
    addRecipient(phoneNumber: string, partnerId: string, sourceSystem: string, recipientType: RecipientType, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createTemplate(input: TemplateInput): Promise<string>;
    deleteSchedule(id: string): Promise<void>;
    deleteTemplate(id: string): Promise<void>;
    getAllContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    getAllDailySchedules(): Promise<Array<Schedule>>;
    getAllFAQs(): Promise<Array<FAQ>>;
    getAllImmediateSchedules(): Promise<Array<Schedule>>;
    getAllPartnerBenefits(): Promise<Array<PartnerBenefit>>;
    getAllSchedules(): Promise<Array<Schedule>>;
    getAllSubmittedDocuments(): Promise<Array<SubmittedDocument>>;
    getAllTemplates(): Promise<Array<WhatsAppTemplate>>;
    getAllWhatsAppMessages(): Promise<Array<WhatsAppMessage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMetaApiConfig(): Promise<MetaApiConfig>;
    getOfficeContactData(): Promise<OfficeContactData>;
    getOnboardingRequirements(): Promise<Array<OnboardingRequirement>>;
    getRecipient(phoneNumber: string): Promise<RecipientRecord>;
    getSchedule(id: string): Promise<Schedule>;
    getTemplate(id: string): Promise<WhatsAppTemplate>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWebhookVerificationStats(): Promise<WebhookVerificationStats | null>;
    getWhatsAppAccountDetails(): Promise<MetaApiConfig | null>;
    getWhatsAppIntegrationStatus(): Promise<string>;
    getWhatsAppTokenStatus(): Promise<string>;
    hasAtLeastOnePhoneNumberAttached(): Promise<MetaPhoneNumberStatus>;
    isCallerAdmin(): Promise<boolean>;
    listMetaTemplates(): Promise<Array<ExternalWhatsAppTemplate>>;
    listRecipients(): Promise<Array<RecipientRecord>>;
    removeRecipient(phoneNumber: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    scheduleMessage(templateId: string, recipientPhoneNumber: string, scheduleType: ScheduleType, runAtTimestamp: Time | null): Promise<void>;
    sendWhatsAppMessage(sender: string, recipient: string, content: string): Promise<void>;
    sendWhatsAppMessageViaAPI(payload: MessagePayload): Promise<MetaApiResponse>;
    submitContactForm(name: string, email: string, phone: string, company: string, message: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateMetaApiConfig(config: MetaApiConfig): Promise<void>;
    updateOfficeContactData(data: OfficeContactData): Promise<void>;
    updateTemplate(input: TemplateUpdateInput): Promise<void>;
    uploadDocument(docType: DocumentType, fileName: string, fileContent: ExternalBlob): Promise<void>;
    verifyMetaWebhook(request: MetaWebhookVerificationRequest): Promise<WebhookVerificationOutcome>;
}
