<?php

namespace App\Notifications;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EscalatedLeadNotification extends Notification
{
    use Queueable;

    public function __construct(private Lead $lead)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('[TEMACONCEPT] Lead escaladé — '.($this->lead->name ?? 'visiteur'))
            ->line('Un visiteur demande à être contacté par un conseiller.')
            ->line('Nom : '.($this->lead->name ?? 'non renseigné'))
            ->line('Société : '.($this->lead->company ?? 'non renseignée'))
            ->line('Email : '.($this->lead->email ?? 'non renseigné'))
            ->line('Téléphone : '.($this->lead->phone ?? 'non renseigné'))
            ->line('Besoin : '.($this->lead->need ?? 'non renseigné'))
            ->line('Score de qualification : '.$this->lead->score.'/100')
            ->action('Voir le lead', url('/espace/leads/'.$this->lead->id));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'lead_id' => $this->lead->id,
            'name' => $this->lead->name,
            'company' => $this->lead->company,
            'email' => $this->lead->email,
            'score' => $this->lead->score,
        ];
    }
}
