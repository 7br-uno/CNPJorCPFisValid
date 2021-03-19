function CNPJorCPFisValid(cpf_cnpj) {
    if (cpf_cnpj.replace(/[^\d]+/g, "").length == 11){
        var strCPF = cpf_cnpj.replace(/[^\d]+/g, "");
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }else if (cpf_cnpj.replace(/[^\d]+/g, "").length == 14){
        var confirm = cpf_cnpj.replace(/[^\d]+/g, "");

        if (confirm.length != 14) return false;

        // Elimina CNPJs invalidos conhecidos
        if (
        confirm == "00000000000000" ||
        confirm == "11111111111111" ||
        confirm == "22222222222222" ||
        confirm == "33333333333333" ||
        confirm == "44444444444444" ||
        confirm == "55555555555555" ||
        confirm == "66666666666666" ||
        confirm == "77777777777777" ||
        confirm == "88888888888888" ||
        confirm == "99999999999999"
        )
        return false;

        // Valida DVs
        var tamanho = confirm.length - 2;
        var numeros = confirm.substring(0, tamanho);
        var digitos = confirm.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        var i;
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;

        tamanho = tamanho + 1;
        numeros = confirm.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;

        return true;
    }
    return false;
}
