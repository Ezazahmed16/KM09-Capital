import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, FileText, UserCheck } from "lucide-react";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";
import { User } from "@/types";

import { cn } from "@/lib/utils";

export interface MemberCardProps {
  member: User;
  onContactClick?: (member: User) => void;
  className?: string;
  imageClassName?: string;
}

const Card6: React.FC<MemberCardProps> = ({
  member,
  onContactClick,
  className,
  imageClassName,
}) => {
  const imageSrc = member.image || member.img || DEFAULT_MEN_AVATAR;

  return (
    <Card
      className={cn(
        "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0b1e33]/70 shadow-sm hover:shadow-xl dark:shadow-slate-950/40 transition-all duration-500 overflow-hidden py-0 flex flex-col sm:flex-row sm:gap-0 group rounded-2xl",
        className
      )}
    >
      {/* Member Avatar / Media Section */}
      <CardContent
        className={cn(
          "grow px-0 relative sm:w-2/5 min-h-[160px] sm:min-h-full bg-slate-100 dark:bg-slate-950/40 overflow-hidden",
          imageClassName
        )}
      >
        <img
          src={imageSrc}
          alt={member.name || "Member Avatar"}
          className="h-[200px] sm:h-[300px] w-full  object-cover sm:min-h-full sm:rounded-l-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_MEN_AVATAR;
          }}
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge className="bg-amber-500/90 text-slate-950 font-bold border-0 text-[10px] shadow-sm backdrop-blur-md">
            {member.role || "Member"}
          </Badge>
          {member.userStatus && (
            <Badge className="bg-emerald-500/90 text-white font-semibold border-0 text-[10px] shadow-sm backdrop-blur-md">
              {member.userStatus}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Member Info Details Section */}
      <div className="sm:w-3/5 flex flex-col justify-between p-1">
        <CardHeader className="space-y-2 py-5 px-6">
          <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors duration-300">
            {member.name}
          </CardTitle>

          <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 truncate">
              <Mail className="h-4 w-4 text-amber-500 shrink-0" />
              <span className="truncate">{member.email}</span>
            </div>

            {member.location && (
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="truncate">{member.location}</span>
              </div>
            )}
          </div>

          <CardDescription className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 pt-2 italic leading-relaxed">
            {member.note ? (
              <span className="flex items-start gap-1.5">
                <FileText className="h-3.5 w-3.5 text-amber-500/80 shrink-0 mt-0.5" />
                <span>"{member.note}"</span>
              </span>
            ) : (
              <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                <span>KM09 Capital verified member profile.</span>
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-3 py-4 px-6 rounded-none border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/40">
          <Button
            onClick={() => onContactClick && onContactClick(member)}
            className="w-full bg-amber-500 text-slate-950 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.18),0_6px_14px_rgba(245,158,11,0.22)] cursor-pointer transition-all duration-300"
          >
            Contact Member
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Card6;
