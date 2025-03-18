import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Layers, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/constant/constant";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    title: "",
    location: "",
    bio: "",
    website: "",
    github: "",
    twitter: "",
    linkedin: "",
    avatar: "",
  });

  const user = Cookies.get("user");
  const userdetails = JSON.parse(user);

  // GET user profile on load
  useEffect(() => {
    axios
      .get(`${AppRoutes.profile}/${userdetails._id}`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [userdetails._id]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Avatar click triggers file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Preview + upload image
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setPreview(URL.createObjectURL(file));

    // Upload to backend
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        `${AppRoutes.profileAvatar}/${userdetails._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfile({ ...profile, avatar: res.data.avatarUrl }); // Assuming backend returns avatarUrl
      toast.success("Profile image updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    }
  };

  // PUT update profile
  const handleSaveProfile = () => {
    setIsSaving(true);
    const extras = {
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      website: profile.website,
      github: profile.github,
      twitter: profile.twitter,
      linkedin: profile.linkedin,
      avatar: profile.avatar,
    };

    axios
      .put(`${AppRoutes.profile}/${userdetails._id}`, {
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        extras,
      })
      .then(() => {
        setIsSaving(false);
        toast.success("Your profile has been saved successfully.");
      })
      .catch(() => {
        setIsSaving(false);
        toast.error("Failed to save profile");
      });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-5 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WebCraft</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/main-dashboard">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="flex-1 p-5 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div
                    className="relative mb-4 cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        src={
                          preview ||
                          profile.avatar ||
                          "/placeholder.svg?height=128&width=128"
                        }
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {profile.firstname[0]}
                        {profile.lastname[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <h2 className="text-xl font-bold">
                    {profile.firstname} {profile.lastname}
                  </h2>
                  <p className="text-muted-foreground">{profile.title}</p>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Location
                    </p>
                    <p>{profile.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Website
                    </p>
                    <p>{profile.website}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your profile information and social links.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={profile.firstname}
                      onChange={(e) =>
                        setProfile({ ...profile, firstname: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={profile.lastname}
                      onChange={(e) =>
                        setProfile({ ...profile, lastname: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input
                      value={profile.website}
                      onChange={(e) =>
                        setProfile({ ...profile, website: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Github</Label>
                    <Input
                      value={profile.github}
                      onChange={(e) =>
                        setProfile({ ...profile, github: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Twitter</Label>
                    <Input
                      value={profile.twitter}
                      onChange={(e) =>
                        setProfile({ ...profile, twitter: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Linkedin</Label>
                    <Input
                      value={profile.linkedin}
                      onChange={(e) =>
                        setProfile({ ...profile, linkedin: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Profile
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
