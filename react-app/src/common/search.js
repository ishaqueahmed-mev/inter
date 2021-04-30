const Search = (props) => {
    return (
        <div id="search-component">
            <label for="search-box">User Search</label>
            <input id="search-box" onInput={props.searchEvent.bind(this)} />
        </div>
    )
}

export default Search;