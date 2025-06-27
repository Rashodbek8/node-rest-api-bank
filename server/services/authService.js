const bcrypt = require("bcrypt")
const jwt = require("../config/jwt");
const userRepository = require("../repositories/userRepository");

exports.register = async(data) => {
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
.test(data.email)){
        throw {status: 400, message: "Invalid email format"};
    };
    
    if(!data.password || data.password.length < 6){
        throw {status: 400, message: "Password must be at least 6 characters long"}
    }
    const existing = await userRepository.findByEmail(data.email);
    if(existing) throw {status: 400, message: "Email already exists"};
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.createUser({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "client"
    });
    return user;
};

exports.login = async({email, password}) => {
    const user = await userRepository.findByEmail(email);
    if(!user) throw {status: 401, message: "Invalid email or password"};

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw {status: 401, message: "Invalid email or password"};
    
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(payload);
    return{token, user};
};