import Container from "@/components/container";
import ProjectManagement from "@/components/project-management";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <Container className="py-6">
          <ProjectManagement />
        </Container>
      </div>
    </div>
  );
}
