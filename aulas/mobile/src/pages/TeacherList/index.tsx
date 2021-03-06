import React, { useState } from 'react'
import { Text,View,ScrollView,TextInput } from 'react-native'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'


function TeacherList(){
    const [favorites, setFavorites] = useState<number[]>([])
    const [isFiltersVisible, setIsFilterVisible]= useState(false)

    const [teachers, setTeachers]= useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds)
            }
        })
    }


    function handleToggleFiltersVisible(){
        setIsFilterVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit(){
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFilterVisible(false)
        setTeachers(response.data)
        console.log(response.data)
        
    }

    return(
    <View style={styles.container}>
        <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
            <BorderlessButton onPress={handleToggleFiltersVisible}>
                <Feather name="filter" size={20} color="#FFF"/>
            </BorderlessButton>
        )}>
            { isFiltersVisible && (
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput 
                    style={styles.input} 
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    placeholder="Qual a matéria?"
                    placeholderTextColor="#c1bccc"/>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput 
                            style={styles.input}
                            placeholder="Qual o dia?"
                            placeholderTextColor="#c1bccc"
                            value={week_day}
                            onChangeText={text => setWeekDay(text)}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput 
                            style={styles.input} 
                            placeholder="Qual horário?"
                            placeholderTextColor="#c1bccc"
                            value={time}
                            onChangeText={text => setTime(text)}/>
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
            )}
        </PageHeader>



        <ScrollView style={styles.teacherList} contentContainerStyle={{
            paddingHorizontal:16,
            paddingBottom:16,
        }}
        >
            {teachers.map((teacher: Teacher) => { 
                return( 
                <TeacherItem 
                key={teacher.id} 
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
                />
                )})}
        </ScrollView>
        

    </View>
    )
}

export default TeacherList