import { useParams } from "react-router-dom";
import InfoPlayer from "../components/player/InfoPlayer";
import usePlayerStats from "../utils/usePlayerStats";

export default function Player() {
    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero
    const { player, stats, loading, error } = usePlayerStats(playerId);

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    if (!player || !stats || stats.length === 0) {
        return <p>Dati non disponibili...</p>;  // Mostra un messaggio se i dati non sono disponibili
    }

    return (
        <>
            <InfoPlayer player={player} stats={stats} />
        </>
    );
}
