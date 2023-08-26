import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ihuehdpseffctiimlxsv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlodWVoZHBzZWZmY3RpaW1seHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0MzAzMzYsImV4cCI6MjAwODAwNjMzNn0.jQYOGsvQmw1i1WK6njmuj3ORnsFjabKTYlEUPT1SbtA";

export default createClient(supabaseUrl, supabaseAnonKey);