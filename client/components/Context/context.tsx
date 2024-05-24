import { createContext } from "react";
import { BookType, PublisherType, AuthorType, CatalogType, MemberType } from "../../style/dbTypes";

interface IContext {
    BookState: BookType[];
    PublisherState: PublisherType[];
    AuthorState: AuthorType[];
    CatalogState: CatalogType[];
    MemberState: MemberType[];
    setBookState: (Books: BookType[]) => void;
    setLoggedIn: (value: boolean) => void;
    setPublisherState: (Publisher: PublisherType[]) => void;
    setAuthorState: (Author: AuthorType[]) => void;
    setCatalogState: (Catalog: CatalogType[]) => void;
    setMemberState: (Member: MemberType[]) => void;
}

const GlobalContext = createContext<IContext>({
    BookState: [],
    PublisherState: [],
    AuthorState: [],
    CatalogState: [],
    MemberState: [],
    setBookState: () => {},
    setLoggedIn: () => {},
    setPublisherState: () => {},
    setAuthorState: () => {},
    setCatalogState: () => {},
    setMemberState: () => {},
})

export default GlobalContext;