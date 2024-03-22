import {createClient} from "@supabase/supabase-js";
import cuid from "cuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!
const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!

const supabase = createClient(supabaseUrl, supabaseKey)

export const useUploadImage = (dir: string) => {
  const upload = async (file: File) => {
    const ext = file.name.split('.').pop()
    const { data, error } = await supabase.storage.from(bucket).upload(`${dir}/${cuid()}.${ext}`, file)

    if (data) {
      return `${supabaseUrl}/storage/v1/object/public/${bucket}/${data.path}`
    } else {
      throw error
    }
  }

  return {
    upload
  }
}
