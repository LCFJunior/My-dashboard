const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Caminho correto para o arquivo de configuração do Sequelize

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {  // mantém 'name' no modelo
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nome',  // mapeia para a coluna 'nome' no banco
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {  // mantém 'password' no modelo
        type: DataTypes.STRING,
        allowNull: false,
        field: 'senha',  // mapeia para a coluna 'senha' no banco
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
}, {
    tableName: 'usuarios',  // Nome da tabela no banco de dados
    timestamps: false,  // Desabilita os campos `createdAt` e `updatedAt`
});

module.exports = { Usuario };
