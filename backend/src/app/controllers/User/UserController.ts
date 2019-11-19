import { UserModel, ImagesModel } from "../../models";
import { IUser, IFile } from "../../types/";
import { DateParser } from "../../classes";
import Crypfy from "../../resources/cryptfy";
import { FileSystem, JsonWebToken } from "../../resources/";
import { ImageController } from "../Files/ImageController";
import { User } from "../../classes/";
import { UniqueConstraintErrorOptions } from "sequelize";

export default class UserController extends ImageController {
  private JsonToken = new JsonWebToken();

  public async CreateUser(user: IUser, file: IFile) {
    try {
      const { password, birthday } = user;
      const crypfyPassword = new Crypfy(password);
      // const data = new DateParser(birthday).ParseDate();

      const queryResult = await UserModel.create({
        ...user,
        birthday,
        password: crypfyPassword.CreateHash()
      }).then(result => new User(result.toJSON()));

      const tokenUser = queryResult.TokenInfo();
      const userInfo = queryResult.SimpleInfo();
      let fileQuery: IFile;
      if (file) {
        try {
          fileQuery = await this.SaveFile(file, tokenUser.id);
        } catch (error) {
          await new FileSystem().DeleteFile(file.path);
          throw error;
        }
      }
      console.log(file);

      const { url } = fileQuery;
      const token = this.JsonToken.CreateToken({
        ...tokenUser,
        url
      });
      return {
        user: { ...userInfo, url },
        token
      };
    } catch (error) {
      console.log(error);

      throw error.name;
    }
  }

  public async UpdateUser(id, userNewInfo: IUser, profile: IFile = null) {
    try {
      let { birthday } = userNewInfo;
      let newDate = birthday
        ? (birthday = new DateParser(birthday).ParseDate())
        : userNewInfo.birthday;

      let updateResult = UserModel.update(
        { ...userNewInfo, birthday: newDate },
        {
          where: {
            id
          }
        }
      );
      if (profile) {
        this.UpdateImage(profile, id);
        return { mensage: "User successfully updated" };
      }
      return { mensage: "User successfully updated" };
    } catch (error) {
      throw error;
    }
  }

  public async GetUser(id: string) {
    try {
      let userQuery = UserModel.findOne({
        where: {
          id
        },
        include: [
          {
            model: ImagesModel,
            limit: 1,
            attributes: ["url"]
          }
        ]
      }).then(result => {
        let res: any = result.toJSON();
        let [url] = res.imagens;
        delete res.imagens;
        return {
          ...res,
          ...url
        };
      });

      let user = await userQuery;
      return { ...user };
    } catch (error) {
      throw error;
    }
  }
  public async GetCurrentUser(token: string) {
    try {
      let tkJson: any = this.JsonToken.VerifyToken(token);
      let user = await this.GetUser(tkJson.id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  public async DeleteUser(id: string) {
    try {
      let deleteResult = UserModel.destroy({
        where: {
          id
        }
      });
      return { mensage: `User Delete ${deleteResult}` };
    } catch (error) {
      throw error;
    }
  }
}
