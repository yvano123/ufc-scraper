declare global {
		interface String {
            removeWhitespace(): string;
            removeReturnCharacters():string
            getStat():string
		}
}
export { };