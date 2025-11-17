console.log("JS Connected - Signup Page Via Supabase!");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://pjzlrbjacxetuptntdfn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqemxyYmphY3hldHVwdG50ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODYzODUsImV4cCI6MjA3ODg2MjM4NX0.n60koN_CiNOlXHknw-b8rbxb090-vz56wQEihQKc-Ps";

const supabase = createClient(supabaseUrl, supabaseKey);

async function userSignup(event) {
  event.preventDefault();

  let userName = document.getElementById("userName").value;
  let userEmail = document.getElementById("userEmail").value;
  let userPassword = document.getElementById("userPassword").value;
  let userConfirmPassword = document.getElementById("userConfirmPassword").value;
  let userBio = document.getElementById("userBio").value;

  if (!userName || !userEmail || !userPassword || !userConfirmPassword || !userBio) {
    alert("Please fill all the fields!");
    return;
  }

  if (userPassword !== userConfirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      data: {
        full_name: userName,
        bio: userBio,
      },
    },
  });

  if (error) {
    alert("Signup Error: " + error.message);
  } else {
    alert("Signup successful! Check your email.");
    console.log(data);
  }
}
async function googleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://supabase-authentication-prcatice.vercel.app/index.html";
    },
  });

  if (error) {
    console.log("Google Error:", error);
    alert("Google Login Error: " + error.message);
  } else {
    console.log("Google Login Redirecting...");
  }
}
window.userSignup = userSignup;
window.googleLogin = googleLogin;
