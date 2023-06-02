A ideia que pensei que possa funcionar será da seguinte forma:

- Com a matriz que obtemos a partir do algoritmo de manhattan, conseguimos setar os nodes do algoritmo A*, 
  sendo esta matriz os valores heuristicos e os custos reais sempre sendo = 1.

- Como teremos mais de uma maçã, teremos que calcular este algoritmo n vezes (a depender da quantidade de maças).

- Com o algoritmo calculado todas as vezes, teremos um vetor contendo as soluções, bem como o custo total.

- Com o custo calculado, ordenaremos este vetor por custo e pegaremos o menor até chegar na primeira maça.

- Chegando na primeira maça, repetiremos os passos anteriores até que consigamos um caminho ótimo, que mesmo que seja invertido,
  teoricamente, terá o mesmo custo.

*Foi utilizado o código desenvolvido por Arthur e Victor --> https://github.com/Sevzera/ia-cefet/tree/master/atv1_busca-A*