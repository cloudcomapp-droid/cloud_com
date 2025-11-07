import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigationState } from "@/hooks/useNavigationState";

export function BreadcrumbNav() {
  const { generateBreadcrumbs } = useNavigationState();
  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center">
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="text-foreground font-medium">
                  {crumb.title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    to={crumb.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.title}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}