import { Character } from "./character.interface";
import { Info } from "../info.interface";

export interface CharacterResponse{
    info: Info;
    results: Character[];
}

