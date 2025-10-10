import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserVerification } from "../entity/UserVerification";
import { generateOTPcode } from "../utils/generateOTPcode";

type newUserDataType = Omit<User, "userID">;

export async function createUser({
  firstName,
  lastName,
  role,
  password,
  dateOfBirth,
  email,
  phone,
}: newUserDataType) {
  const newUser = new User();
  let userVerification = new UserVerification();

  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.password = password;
  newUser.role = role;
  newUser.phone = phone;
  newUser.email = email;
  newUser.dateOfBirth = dateOfBirth;

  const userRepository = AppDataSource.getRepository(User);
  const userVerificationRepository =
    AppDataSource.getRepository(UserVerification);

  const userId = (await userRepository.save(newUser)).userID;

  userVerification = {
    verified: false,
    userId: userId,
    verfiedAt: null,
    verificationToken: generateOTPcode(),
    user: newUser,
  };
  await userVerificationRepository.save(userVerification);
}

class UserService {
  async getUserByEmail(email: string) {
    try {
      const userRepository = AppDataSource.getRepository(User);

      const userData = await userRepository.findOne({
        where: { email: email },
      });

      return userData;
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserService;
