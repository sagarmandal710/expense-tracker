const PageHeader = ({ title, imageUrl }) => {

    const style = {
        backgroundImage: `url(${imageUrl})`
    }

    return (
        <div className="page-header">
            <div className="header-image" style={style}></div>
            <div className="header-text">
                <div>{title}</div>
            </div>
        </div>
    );
}

export default PageHeader;