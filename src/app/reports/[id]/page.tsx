"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Calendar, CheckCircle2, Circle, Clock, ArrowLeft, Share2, ThumbsUp, Building, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ReportDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const issueId = params.id as string;
  const [issue, setIssue] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/issues/${issueId}`)
      .then(res => res.json())
      .then(data => setIssue(data.data || data))
      .catch(err => console.error(err));
  }, [issueId]);

  if (!issue) return <div className="p-8 text-center text-white">Loading...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Reports
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
            <div className="h-[400px] w-full relative">
              <img src={issue.photoUrl} alt={issue.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant="outline" className={`px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-md">
                    {issue.category}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{issue.title}</h1>
                <p className="text-primary font-medium tracking-wide">ID: {issue.complaintId}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p className="text-white">{issue.location}</p>
                    <p className="text-white/60 text-sm">{issue.district}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reported On</p>
                    <p className="text-white">{issue.reportedOn}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Description
                </h3>
                <p className="text-white/80 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                  {issue.description}
                </p>
              </div>

              {/* Map Preview */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Location Map</h3>
                <div className="h-48 bg-slate-900 rounded-2xl border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline & Actions */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-6">Status Timeline</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {issue.timeline.map((event, i) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  <div className={`mt-1 relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 
                    ${event.isCompleted ? 'bg-primary border-primary text-background' : 'bg-background border-white/20 text-white/20'}`}>
                    {event.isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold ${event.isCompleted ? 'text-white' : 'text-muted-foreground'}`}>
                      {event.stage}
                    </h4>
                    {event.date && <p className="text-xs text-primary mt-1 mb-1">{event.date}</p>}
                    {event.note && (
                      <p className={`text-xs ${event.isCompleted ? 'text-white/70' : 'text-white/30'}`}>
                        {event.note}
                      </p>
                    )}
                    {event.department && (
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground bg-white/5 px-2 py-1 rounded w-fit">
                        <Building className="h-3 w-3" />
                        {event.department}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between text-white bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <ThumbsUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{issue.votes} Supporters</p>
                  <p className="text-xs text-muted-foreground">People affected by this</p>
                </div>
              </div>
            </div>

            <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Support Issue
            </Button>
            <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/5">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
