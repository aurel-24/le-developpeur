import {createClient} from "@/src/utils/supabase/server";
import cron from 'node-cron';
import { sendEmail } from '@/src/utils/send-email';

export default function handler(req:any, res:any) {
  // Define the cron job to run every minute
  cron.schedule('* * * * *', async () => {
    console.log("Cron execute");
    try {
        
        const supabase = createClient();
      
        const {
          data: licences,
        } = await supabase.from("Licence").select();
      
        if (!licences) {
          return 0;
        }
      
        const getTimeLeft = (dateAchat: Date, dateExpiration: Date) => {
          return (dateExpiration.getTime() - dateAchat.getTime()) / (1000 * 60 * 60 * 24);
        }
        
        licences.forEach(async licence => {
            const timeLeft = getTimeLeft(new Date(licence.date_achat), new Date(licence.date_expiration));
            if (timeLeft < 5) {
                const { data: userData, error } = await supabase.from('auth.users').select('email').eq('id', licence.responsable).single();
                if (userData && !error) {
                    const responsableEmail = userData.email;
                    await sendEmail(responsableEmail);
                  }         
              }
        })
      
    
    } catch (error) {
      console.error('Error sending periodic email:', error);
    }
  });

  res.status(200).json({ message: 'Scheduled job created' });
}
