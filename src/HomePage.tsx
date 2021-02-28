import ProfileCard from './ProfileCard';

export default function HomePage() {
    return (
        <ProfileCard
            id="string"
            name="Toan Nguyen"
            picture="https://randomuser.me/api/portraits/men/81.jpg"
            age={39}
            gender="male"
            onLike={() => {}}
            onDislike={() => {}}
        />
    );
}
