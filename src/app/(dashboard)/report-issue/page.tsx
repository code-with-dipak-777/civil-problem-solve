"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, MapPin, AlertTriangle, Upload, X, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast"; // wait, the toast needs a hook, maybe shadcn toast is installed.
import { IssueCategory } from "@/types";

const formSchema = z.object({
  category: z.string().min(1, "Please select an issue category"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  district: z.string().min(1, "Please select a district"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.string().min(1, "Please select a priority level"),
  landmark: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReportIssuePage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: "",
      district: "",
      description: "",
      priority: "",
      landmark: "",
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Simulate AI detection
    if (data.category === "Pothole" && data.location.includes("Main Road")) {
      setShowDuplicateDialog(true);
      return;
    }
    
    await submitFinal(data);
  };

  const submitFinal = async (data: FormValues) => {
    setIsSubmitting(true);
    setShowDuplicateDialog(false);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccessDialog(true);
    form.reset();
    setPhoto(null);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 p-8 border border-primary/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-primary/20 p-4 rounded-2xl">
            <AlertTriangle className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Report. Track. Create Change.</h1>
            <p className="text-muted-foreground text-lg">Your small action can make a big difference in your community.</p>
          </div>
        </div>
      </div>

      <Card className="glass-card border-white/5 rounded-3xl overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Photo Upload */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white block">Upload Photo</label>
              <div className={`border-2 border-dashed rounded-2xl overflow-hidden relative group transition-colors h-64 flex items-center justify-center
                ${photo ? 'border-primary/50' : 'border-white/10 hover:border-white/20 bg-white/5'}`}>
                {photo ? (
                  <>
                    <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setPhoto(null)}
                      className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white hover:bg-black transition-colors backdrop-blur-md"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6 flex flex-col items-center">
                    <div className="bg-white/10 p-4 rounded-full mb-4">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-white font-medium mb-1">Click or drag & drop to upload</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Issue Category</label>
                <Select onValueChange={(val) => form.setValue('category', val)}>
                  <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pothole">Pothole</SelectItem>
                    <SelectItem value="Garbage">Garbage Overflow</SelectItem>
                    <SelectItem value="Streetlight">Streetlight Issue</SelectItem>
                    <SelectItem value="Drainage">Drainage Problem</SelectItem>
                    <SelectItem value="Water Leakage">Water Leakage</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-destructive text-xs">{form.formState.errors.category.message}</p>
                )}
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Priority Level</label>
                <Select onValueChange={(val) => form.setValue('priority', val)}>
                  <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.priority && (
                  <p className="text-destructive text-xs">{form.formState.errors.priority.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    {...form.register("location")}
                    placeholder="Enter precise location..." 
                    className="pl-10 bg-white/5 border-white/10 rounded-xl h-12 pr-32"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="absolute right-1 top-1 h-10 text-primary hover:text-primary hover:bg-primary/10 rounded-lg text-xs"
                  >
                    <LocateIcon className="h-3 w-3 mr-1" /> Use Current
                  </Button>
                </div>
                {form.formState.errors.location && (
                  <p className="text-destructive text-xs">{form.formState.errors.location.message}</p>
                )}
              </div>
              
              {/* District */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">District</label>
                <Select onValueChange={(val) => form.setValue('district', val)}>
                  <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ranchi">Ranchi</SelectItem>
                    <SelectItem value="Dhanbad">Dhanbad</SelectItem>
                    <SelectItem value="East Singhbhum">East Singhbhum</SelectItem>
                    <SelectItem value="Bokaro">Bokaro</SelectItem>
                    <SelectItem value="Hazaribagh">Hazaribagh</SelectItem>
                    <SelectItem value="Deoghar">Deoghar</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.district && (
                  <p className="text-destructive text-xs">{form.formState.errors.district.message}</p>
                )}
              </div>

              {/* Landmark */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Landmark (Optional)</label>
                <Input 
                  {...form.register("landmark")}
                  placeholder="E.g. Near City Mall" 
                  className="bg-white/5 border-white/10 rounded-xl h-12"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white">Description</label>
                <Textarea 
                  {...form.register("description")}
                  placeholder="Provide more details about the issue..." 
                  className="bg-white/5 border-white/10 rounded-xl min-h-[120px] resize-none"
                />
                {form.formState.errors.description && (
                  <p className="text-destructive text-xs">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Report...
                </div>
              ) : (
                "Submit Report →"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Merge Info Card */}
      <div className="mt-6 glass-card p-4 flex items-start gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 shrink-0">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-200">AI Auto-Merge</h4>
          <p className="text-sm text-muted-foreground mt-1">Duplicate reports are automatically detected and merged to avoid redundancy and prioritize fixes faster.</p>
        </div>
      </div>

      {/* Duplicate Detection Dialog */}
      <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <DialogContent className="glass-card border-white/10 sm:max-w-md rounded-3xl">
          <DialogHeader>
            <div className="mx-auto bg-orange-500/20 p-3 rounded-full w-fit mb-4">
              <Brain className="h-8 w-8 text-orange-500" />
            </div>
            <DialogTitle className="text-center text-xl">Similar issue detected nearby</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Our AI found a similar report close to your location. Supporting an existing issue increases its priority.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-white/5 rounded-xl p-4 my-4 border border-white/10">
            <h4 className="font-semibold text-white">Pothole on Main Road</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> 200m away</span>
              <span className="flex items-center"><AlertTriangle className="h-3 w-3 mr-1" /> Reported 3h ago</span>
            </div>
            <div className="mt-3 inline-block bg-primary/20 text-primary text-xs px-2 py-1 rounded font-medium">
              12 people reported this
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
            <Button variant="outline" onClick={() => submitFinal(form.getValues())} className="w-full rounded-xl border-white/10">
              Continue Anyway
            </Button>
            <Button onClick={() => submitFinal(form.getValues())} className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white">
              Support Existing Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="glass-card border-emerald-500/20 sm:max-w-sm rounded-3xl text-center flex flex-col items-center py-10">
          <div className="bg-emerald-500/20 p-4 rounded-full mb-4 ring-8 ring-emerald-500/10">
            <div className="h-10 w-10 text-emerald-500 flex items-center justify-center">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Report Submitted!</DialogTitle>
          <DialogDescription className="mb-6 text-muted-foreground">
            Thank you for helping keep your community clean and safe.
          </DialogDescription>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Complaint ID</p>
            <p className="text-xl font-mono text-white tracking-wider">CC-2026-00124</p>
          </div>
          <Button onClick={() => setShowSuccessDialog(false)} className="w-full rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10">
            View My Reports
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LocateIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}
