import pandas as pd
import numpy as np

# Tentukan jumlah sampel yang akan di-generate
num_samples = 10000

# Seed random number generator for reproducibility
np.random.seed(42)

data = {
    'Confidence_Level': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_WebDev': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_WebDev': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_GameDev': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_GameDev': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_CyberSecurity': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_CyberSecuirty': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_DataScience': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_DataScience': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_MobileDev': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_MobileDev': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_ProductManager': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_ProductManager': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_UIUX': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_UIUX': np.random.randint(1, 11, num_samples),
    'Self_Assessed_Skill_Level_in_SoftEng': np.random.randint(1, 11, num_samples),
    'Interest_Level_in_SoftEng': np.random.randint(1, 11, num_samples),
}

# Tentukan skill yang perlu ditingkatkan pertama kali berdasarkan minat tetapi dengan kemampuan yang paling rendah
skill_columns = [
    'Self_Assessed_Skill_Level_in_WebDev',
    'Self_Assessed_Skill_Level_in_GameDev',
    'Self_Assessed_Skill_Level_in_CyberSecurity',
    'Self_Assessed_Skill_Level_in_DataScience',
    'Self_Assessed_Skill_Level_in_MobileDev',
    'Self_Assessed_Skill_Level_in_ProductManager',
    'Self_Assessed_Skill_Level_in_UIUX',
    'Self_Assessed_Skill_Level_in_SoftEng'
]

interest_columns = [
    'Interest_Level_in_WebDev',
    'Interest_Level_in_GameDev',
    'Interest_Level_in_CyberSecuirty',
    'Interest_Level_in_DataScience',
    'Interest_Level_in_MobileDev',
    'Interest_Level_in_ProductManager',
    'Interest_Level_in_UIUX',
    'Interest_Level_in_SoftEng'
]

# Find the skill to improve first
def skill_to_improve(row):
    min_skill_level = float('inf')
    skill_to_improve = None
    max_interest = -1

    if row['Confidence_Level'] < 5:
        return 'CodingSkill'

    for skill, interest in zip(skill_columns, interest_columns):
        if row[interest] > 5:
             if row[skill] < min_skill_level or (row[skill] == min_skill_level and row[interest] > max_interest):
                min_skill_level = row[skill]
                max_interest = row[interest]
                skill_to_improve = skill.split('_')[-1]

        if skill_to_improve is None:
            max_interest = -1
            for skill in skill_columns:
                if row[skill] < min_skill_level and row[interest] > max_interest:
                    max_interest = row[interest]
                    min_skill_level = row[skill]
                    skill_to_improve = skill.split('_')[-1]

    return skill_to_improve

df = pd.DataFrame(data)
df['Skill_to_Improve_First'] = df.apply(skill_to_improve, axis=1)

# Write to CSV
df.to_csv('./model/data.csv', index=False)