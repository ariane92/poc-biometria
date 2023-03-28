
import { useEffect, useState } from 'react';
import {  Text, View, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'
import { styles } from './styles'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)  

  const verifyAvailableBiometria = async () => {
     //O dispositivo possuí suporte?
     const compatible = await LocalAuthentication.hasHardwareAsync();
    
     //Quais são as tecnologias que o dispositivo suporta?
     const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  }

  const handleAuthentication = async () => {
     //O disposito tem alguma biometria cadastrada?
     const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
     
     const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login realizado com sucesso',
      fallbackLabel: 'Ocorreu um erro, tente novamente'
     })

     setIsAuthenticated(auth.success)
  }

  useEffect(() => {
    verifyAvailableBiometria()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Uzer conectado: {isAuthenticated ? 'Sim' : 'Não'}</Text>
      <Button title='Login' onPress={handleAuthentication} />
    </View>
  );
}


