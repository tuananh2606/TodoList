import Card from './Card';

const CardList = () => {
    return (
        <div className="">
            <h1 className="text-3xl mb-4">Tasks</h1>
            <div className="grid grid-cols-3 gap-3">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default CardList;
