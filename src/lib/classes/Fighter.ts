export class Fighter {
	id!: string;
	firstName!: string;
	lastName!: string;
	nickname?: string;
	height!: string;
	weight!: string;
	reach!: string;
	stance?: string;
	dateOfBirth?: string;
	record?: string;
	wins!: number;
	losses!: number;
	draws!: number;
	noContests!: number;
	updatedAt!: Date;
	fights: Array<ProfileFightItem> = [];
}
export class ProfileFightItem {
	opponentName!: string;
	result!: number;
	fightDetailsId!: string;
	// method!: string;
}
