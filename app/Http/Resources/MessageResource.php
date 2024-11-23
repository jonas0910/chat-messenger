<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\MessageAttachmentResource;

class MessageResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sender_id' => $this->sender_id,
            'receiver_id' => $this->receiver_id,
            'message' => $this->message,
            'sender' => new UserResource($this->sender),
            'group_id' => $this->group_id,
            'attachments' => MessageAttachmentResource::collection($this->attachments),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
