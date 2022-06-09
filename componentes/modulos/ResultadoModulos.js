
export default function ResultadoModulos({nome, descricao, qtdAulas, onClick, id}) {
    return (
        <div className="resultadoModulos" onClick={() => onClick(id)}>
            <div className="informacoesModulos">
                <p>{nome}</p>
                <p>{descricao}</p>
                <p>{qtdAulas}</p>
            </div>
        </div>
    );
}