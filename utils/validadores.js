const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

const validarnivelAcesso = (nivelAcesso) => {
    return nivelAcesso?.toString().length > 4;
}

const validarEmail = (email) => {
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return validarSenha(senha) && senha === confirmacao;
}

const validaDescricao = (descricao) => {
    return descricao?.toString().length > 5;
}

const validaData = (data) => {
    return data?.toString().length > 7;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha,
    // validarnivelAcesso,
    validaDescricao,
    validaData
}