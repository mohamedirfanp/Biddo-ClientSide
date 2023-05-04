import { IEvent } from "./IEvent";
import { SelectedService } from "./ISelectedService";

export interface EventDto 
{
    Event : IEvent;
    SelectedServices : SelectedService[]
}