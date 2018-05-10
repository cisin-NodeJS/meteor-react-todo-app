import SimplSchema from 'simpl-schema';
import { nothing } from 'uniforms';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true,
        uniforms: () => nothing
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
        uniforms: () => nothing
    },
    isCompleted: {
        type: Boolean,
        defaultValue: false,
        uniforms: () => nothing
    },
    updatedAt: {
        type: Date,
        defaultValue: new Date(),
        uniforms: () => nothing
    },
});