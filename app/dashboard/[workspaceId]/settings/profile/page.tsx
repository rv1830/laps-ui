"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User, Mail, Phone, Calendar, Globe, Shield,
  Clock, Hash, CheckCircle2, XCircle, Sparkles, Fingerprint, Key,
  ChevronRight, Camera
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.checkStatus();
        setUserData(res.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <ProfileSkeleton />;

  if (!userData) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 pt-24">
      <XCircle className="w-12 h-12 text-destructive opacity-20" />
      <p className="text-muted-foreground font-bold uppercase tracking-tighter">User engine not found.</p>
    </div>
  );

  return (
    // Yahan pt-24 (96px) margin diya hai taaki Navbar ke niche space rahe
    <div className="max-w-5xl mx-auto space-y-8 pb-10 pt-24 px-6 md:px-0">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <User size={200} />
          </div>
          
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-cyan-500 rounded-full blur-md opacity-20 animate-pulse"></div>
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl relative z-10">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-4xl font-black bg-gradient-to-br from-primary/10 to-primary/5 text-primary italic">
                    {userData.firstName?.[0]}{userData.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-background p-1.5 rounded-full border-2 border-card shadow-lg z-20">
                  {userData.isActive ? (
                    <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-destructive" />
                  )}
                </div>
              </div>

              <div className="text-center md:text-left space-y-4 flex-grow">
                <div className="space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-foreground">
                      {userData.firstName} {userData.lastName}
                    </h1>
                    {userData.emailVerified && (
                      <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
                    )}
                  </div>
                  <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> 
                    LAPS Verified Identity <span className="text-primary/20">•</span> {userData.role || "Operator"}
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl font-bold uppercase tracking-tighter hover:bg-primary hover:text-white transition-all cursor-default">
                    <Fingerprint className="w-3.5 h-3.5 mr-2" /> ID: {userData.id?.substring(0, 8)}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5 rounded-xl font-black border-border shadow-sm">
                    <Globe className="w-3.5 h-3.5 mr-2" /> {userData.timezone || "UTC+0"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* --- INFO GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Module */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card className="h-full border-border/40 bg-card/30 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <User className="w-5 h-5" />
                 </div>
                 <div>
                    <CardTitle className="text-xl font-black tracking-tight italic uppercase">Identity Core</CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Verified Personal Parameters</CardDescription>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoBox icon={Mail} label="Communication Channel" value={userData.email} />
              <InfoBox icon={Phone} label="Mobile Link" value={userData.phoneNumber} />
              <InfoBox 
                icon={Calendar} 
                label="Activation Cycle" 
                value={userData.dob ? format(new Date(userData.dob), "PPP") : "Not Initialized"} 
              />
              <InfoBox icon={Key} label="Access Tier" value={userData.role || "Standard Member"} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Meta Stats */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full border-border/40 bg-card/30 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Shield className="w-5 h-5" />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tight italic uppercase">Metadata</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">System Log Persistence</p>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/40">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold font-mono tracking-tighter">
                    {userData.lastLoginAt ? format(new Date(userData.lastLoginAt), "PPpp") : "First Session"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Global Synchronization</p>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/40">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-tighter">{userData.timezone || "UTC+0"}</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all group">
                 <span className="text-xs font-black uppercase tracking-widest text-primary">Security Settings</span>
                 <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon, label, value }: any) {
  return (
    <div className="group space-y-3 p-6 rounded-3xl bg-background/40 border border-border/30 hover:border-primary/40 transition-all">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{label}</p>
      </div>
      <p className="text-sm font-black tracking-tight text-foreground truncate">{value || "Unset"}</p>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-pulse pt-24 px-6 md:px-0">
      <div className="h-64 bg-muted rounded-[2.5rem]" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-96 bg-muted rounded-[2rem]" />
        <div className="h-96 bg-muted rounded-[2rem]" />
      </div>
    </div>
  );
}