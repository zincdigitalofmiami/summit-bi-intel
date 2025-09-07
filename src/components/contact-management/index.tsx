"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin,
  Clock,
  Star,
  Building2,
  User
} from "lucide-react";
import { logger } from "@/lib/logger";

const emergencyContacts = [
  {
    id: "coast-guard",
    name: "US Coast Guard",
    title: "Emergency Services",
    phone: "911",
    secondaryPhone: "(305) 535-4414",
    type: "emergency",
    available: "24/7"
  },
  {
    id: "marine-police",
    name: "Marine Police",
    title: "Biscayne Bay Unit",
    phone: "(305) 673-7900",
    type: "emergency",
    available: "24/7"
  }
];

const keyContacts = [
  {
    id: "harbor-master",
    name: "Captain Maria Rodriguez",
    title: "Harbor Master",
    company: "Miami Marine Center",
    phone: "(305) 555-0123",
    email: "m.rodriguez@miamimarine.com",
    type: "official",
    priority: "high",
    location: "Biscayne Bay"
  },
  {
    id: "project-manager",
    name: "David Thompson",
    title: "Project Manager",
    company: "Oceanfront Resort Group",
    phone: "(305) 555-0156",
    email: "d.thompson@oceanfront.com",
    type: "client",
    priority: "high",
    lastContact: "Today, 2:30 PM"
  },
  {
    id: "inspector",
    name: "James Wilson",
    title: "Marine Construction Inspector",
    company: "Miami-Dade County",
    phone: "(305) 555-0189",
    email: "j.wilson@miamidade.gov",
    type: "official",
    priority: "medium",
    lastContact: "Yesterday"
  },
  {
    id: "supplier",
    name: "Sarah Chen",
    title: "Materials Coordinator",
    company: "Coastal Marine Supply",
    phone: "(305) 555-0167",
    email: "s.chen@coastalmarine.com",
    type: "vendor",
    priority: "medium",
    lastContact: "3 days ago"
  }
];

export default function ContactManagement() {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleMessage = (contact: typeof keyContacts[0]) => {
    // Log messaging action
    logger.info(`Messaging contact: ${contact.name}`);

    // For now, open SMS app or messaging app
    // In a real implementation, this would integrate with a messaging service
    if (contact.phone) {
      // Try to open SMS app
      const smsUrl = `sms:${contact.phone}`;
      window.open(smsUrl, '_blank');

      logger.info(`Opened SMS app for ${contact.name} (${contact.phone})`);
    } else {
      logger.warn(`No phone number available for messaging ${contact.name}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "client":
        return <Building2 className="h-4 w-4" />;
      case "official":
        return <Star className="h-4 w-4" />;
      case "vendor":
        return <User className="h-4 w-4" />;
      case "emergency":
        return <Phone className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Contacts */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="bg-red-50 dark:bg-red-950/20">
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <div 
                key={contact.id} 
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-950 rounded-lg border"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-muted-foreground">{contact.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {contact.available}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleCall(contact.phone)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.phone}
                  </Button>
                  {contact.secondaryPhone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(contact.secondaryPhone)}
                    >
                      {contact.secondaryPhone}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Key Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(contact.type)}
                    <h4 className="font-medium">{contact.name}</h4>
                    <Badge className={getPriorityColor(contact.priority)}>
                      {contact.priority} priority
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                    <p className="text-sm font-medium">{contact.company}</p>
                    {contact.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {contact.location}
                      </p>
                    )}
                    {contact.lastContact && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last contact: {contact.lastContact}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 mt-3 sm:mt-0">
                  <Button
                    size="sm"
                    onClick={() => handleCall(contact.phone)}
                    className="flex-1 sm:flex-none"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEmail(contact.email)}
                    className="flex-1 sm:flex-none"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMessage(contact)}
                    className="flex-1 sm:flex-none"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
