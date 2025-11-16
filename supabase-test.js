// supabase-test.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjzlrbjacxetuptntdfn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqemxyYmphY3hldHVwdG50ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODYzODUsImV4cCI6MjA3ODg2MjM4NX0.n60koN_CiNOlXHknw-b8rbxb090-vz56wQEihQKc-Ps";
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from("profiles").select("*").limit(1);
  console.log("DATA:", data);
  console.log("ERROR:", error);
}

test();
