import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatCards } from "@/components/dashboard/StatCards";
import { IssuesMap } from "@/components/dashboard/IssuesMap";
import { IssuesByDistrictList } from "@/components/dashboard/IssuesByDistrictList";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { IssueTypeDistribution, TopDistrictsChart } from "@/components/dashboard/Charts";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <WelcomeBanner />
      <StatCards />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <IssuesMap />
        </div>
        <div>
          <IssuesByDistrictList />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReportsTable />
        <div className="grid grid-cols-1 gap-6">
          <QuickActions />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IssueTypeDistribution />
        <TopDistrictsChart />
      </div>
    </div>
  );
}
