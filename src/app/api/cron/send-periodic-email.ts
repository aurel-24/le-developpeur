import {createClient} from "@/src/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from 'next'
import cron from 'node-cron';
import { sendEmail } from '@/src/utils/send-email';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log("Handler triggered");

    try {
        const supabase = createClient();
      
        const {
          data: licences,
        } = await supabase.from("Licence").select();
      
        if (!licences) {
          return res.status(200).json({ message: 'No licences found' });
        }
      
        const getTimeLeft = (dateAchat: Date, dateExpiration: Date) => {
          return (dateExpiration.getTime() - dateAchat.getTime()) / (1000 * 60 * 60 * 24);
        }
        
        licences.forEach(async licence => {
            const timeLeft = getTimeLeft(new Date(licence.date_achat), new Date(licence.date_expiration));
            if (timeLeft < 30) {
                const { data: userData, error } = await supabase.from('auth.users').select('email').eq('id', licence.responsable).single();
                if (userData && !error) {
                    const responsableEmail = userData.email;
                    await sendEmail(responsableEmail);
                  }         
              }
        });

        return res.status(200).json({ message: 'Emails sent successfully' });

    } catch (error: any) {
        console.error('Error sending periodic email:', error);
        return res.status(500).json({ message: 'Error sending periodic email', error: error.message });
    }
}
