console.log("JS Connected - Profile Page Via Supabase Authentication!");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://pjzlrbjacxetuptntdfn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqemxyYmphY3hldHVwdG50ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODYzODUsImV4cCI6MjA3ODg2MjM4NX0.n60koN_CiNOlXHknw-b8rbxb090-vz56wQEihQKc-Ps";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getUserProfile() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    // if (userError || !user) {
    //     console.log("User Fetch Error:", userError?.message || "No user logged in");
    //     return;
    // };
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
const userId = sessionData?.session?.user?.id;

if (!userId) {
    console.log("No logged-in user");
    return;
}

const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, email, bio")
    .eq("user_id", userId)
    .maybeSingle();


    if (profileError) {
        console.log("Profile Fetch Error:", profileError.message);
        return;
    };

    if (!profile) {
    console.log("No profile found for this user.");
    document.getElementById("userName").textContent = "Unknown";
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userBio").textContent = "No bio set";
    return;
    };
    document.getElementById("userName").textContent = profile.username;
    document.getElementById("userEmail").textContent = profile.email;
    document.getElementById("userBio").textContent = profile.bio || "No bio set";

    
console.log("UserName: " + profile.username);
}

window.addEventListener("DOMContentLoaded", getUserProfile);
