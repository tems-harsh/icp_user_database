import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor {
  type User = {
    id : Text;
    name : Text;
    title : Text;
    age : Int;
  };

  var userMap = HashMap.HashMap<Text, User>(30, Text.equal, Text.hash);

  public query func getUsers() : async [User] {
    var userList = List.nil<User>();

    for (user in userMap.vals()) {
      userList := List.push(user, userList);
    };

    List.toArray(userList);
  };

  public func createUser(id : Text, name : Text, title : Text, age : Int) {
    let newUser : User = {
      id = id;
      name = name;
      title = title;
      age = age;
    };

    userMap.put(id, newUser);
  };

  public func deleteUser(id : Text) {
    userMap.delete(id);
  };

};
