import { IsString } from "class-validator";


// eslint-disable-next-line prettier/prettier
export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    cpf: string;

    @IsString()
    password: string;
}
