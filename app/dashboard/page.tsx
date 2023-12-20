import { Database } from "@/app/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const DashboardPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const data = await supabase.from("courses").select("*");
  console.log("data", data);

  return <p>dashboard</p>;
};

export default DashboardPage;
