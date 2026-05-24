export class Fighter{
    Name!: string;
    nickname?: string;
    height!: string;
    weight!: string;
    reach!: string;
    stance?: string;
    dateOfBirth?: string
    record?:string
    wins!: number;
    url!: string
    matches: Array<ProfileMatchItem> = [];
}
export class ProfileMatchItem{
    opponentName!: string;
    result!: string;
    method!: string;
}