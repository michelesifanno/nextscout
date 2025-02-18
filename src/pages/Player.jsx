import { useParams } from "react-router-dom";
import usePlayerStats from "../utils/getPlayerStats";

export default function Player() {
    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero
    const { player, stats, loading, error } = usePlayerStats(playerId);

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    if (!player || !stats || stats.length === 0) {
        return <p>Dati non disponibili...</p>;  // Mostra un messaggio se i dati non sono disponibili
    }

    // Accedi alla prima statistica
    const statistics = stats[0];

    // Verifica se le statistiche e la squadra esistono
    const teamName = statistics?.team?.name || "N/A"; // Se non ci sono statistiche, mostra "N/A"
    
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h1>{player.name} ({player.nationality})</h1>
            <img src={player.photo} alt={player.name} width="150" style={{ borderRadius: "50%" }} />
            <p><strong>Squadra:</strong> {teamName}</p> {/* Mostra il nome della squadra */}
            <p><strong>Ruolo:</strong> {player.position || "N/A"}</p>
            <p><strong>Età:</strong> {player.age} anni</p>
            <p><strong>Altezza:</strong> {player.height}</p>
            <p><strong>Peso:</strong> {player.weight}</p>
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleString()}</p>
        </div>
    );
}
