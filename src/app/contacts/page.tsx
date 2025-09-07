import Container from "@/components/container";
import ContactManagement from "@/components/contact-management";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Contact Management</h1>
              <p className="text-muted-foreground mt-1">
                Quick access to emergency contacts, key clients, and project stakeholders
              </p>
            </div>
          </div>
        </Container>
      </div>
      
      <div className="border-b border-border">
        <Container className="py-6">
          <ContactManagement />
        </Container>
      </div>
    </div>
  );
}
