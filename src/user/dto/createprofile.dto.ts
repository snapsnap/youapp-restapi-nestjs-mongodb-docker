import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class CreateProfileDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly birthday: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly height: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly weight: number

    @ApiProperty()
    @IsNotEmpty()
    readonly interests: string[]

    @IsEmpty({
        message: 'You cannot pass user id'
    })
    readonly user: User
}