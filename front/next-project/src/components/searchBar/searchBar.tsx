export const SearchBar: React.FC = () => {
    return (
        <div className="flex flex-row justify-center gap-6">
            <a className="buttonPrimary" href="/category/rum">ron</a>
            <a className="buttonPrimary" href="/category/spirits">spirit</a>
            <a className="buttonPrimary" href="/category/whiskey">whiskey</a>
            <a className="buttonPrimary" href="/category/wine">wine</a>
        </div>
    )
};