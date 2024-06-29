interface IOrgs_data {
  name: string;
  id: string;
  image: string;
  abbr: string;
  org_logo: string;
}

interface IAuthors {
  name: string;
  id: string;
  username: string;
  profile_photo: string;
}

interface IPost {
  $id: string;
  caption: string;
  creator: string;
  profile_photo: string;
  username: string;
  image: string;
}

interface IComment {
  id: string;
  name: string;
  profile_photo: string;
  username: string;
  caption: string;
}

export { IOrgs_data, IPost, IAuthors, IComment };
