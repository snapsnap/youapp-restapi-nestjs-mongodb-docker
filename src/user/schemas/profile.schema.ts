import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


@Schema({
    timestamps: true
})
export class Profile {

    @Prop()
    name: string

    @Prop()
    birthday: string

    @Prop()
    height: number

    @Prop()
    weight: number

    @Prop([String])
    interests: string[]

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: User
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);