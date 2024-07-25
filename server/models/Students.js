module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: true
          },
          year: {
            type: DataTypes.STRING,
            allowNull: true
          },
          mte1Marks: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          mte2Marks: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          cwsMarks: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          eteMarks: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          grade: {
            type: DataTypes.STRING,
            allowNull: true
          },
          present: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          absent: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          guide: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          status: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: true
          },
    });

    
    return Students;
};