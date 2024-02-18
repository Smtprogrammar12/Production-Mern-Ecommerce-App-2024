import bcrypt from 'bcrypt';

export const hashPassword = async(password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log('Error in hashing password: ', error);
    }
};

// compare password;

export const comparePassword = (password , hashedPassword) => {
    try {
        const comparedPassed = bcrypt.compare(password, hashedPassword);
        return comparedPassed;

    } catch (error) {
        throw new Error ('Error comparing passwords');
    }
}